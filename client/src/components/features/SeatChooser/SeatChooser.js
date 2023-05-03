import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import io from "socket.io-client";
import { getSeats, getRequests, loadSeats, loadSeatsRequest } from '../../../redux/seatsRedux';
import './SeatChooser.scss';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io("http://localhost:8000");
    socketRef.current = socket;

    dispatch(loadSeatsRequest());

    socket.on("updateSeats", (seats) => {
      console.log("updateSeats event received:", seats)
      dispatch(loadSeats(seats));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const isTaken = (seatId) => {
    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color='primary'
          className='seats__seat'
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };
  const totalSeats = 50;
  const occupiedSeats = seats.filter((seat) => seat.day === chosenDay).length
  const freeSeats = totalSeats - occupiedSeats;
  return (
    <div>
      <h3>Pick a seat</h3>
      <small id='pickHelp' className='form-text text-muted ml-2'>
        <Button color='secondary' /> – seat is already taken
      </small>
      <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
        <Button outline color='primary' /> – it's empty
      </small>
      <div className='seats'>
        {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
      </div>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
        <Progress animated color='primary' value={50} />
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
        <Alert color='warning'>Couldn't load seats...</Alert>
      )}
      <p>Free seats: {freeSeats}/{totalSeats}</p>
    </div>
  );
};

export default SeatChooser;