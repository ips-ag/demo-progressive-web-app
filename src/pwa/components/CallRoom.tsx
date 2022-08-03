import { useCallback, useEffect, useRef } from 'react';
import DailyIframe, { DailyCallOptions } from '@daily-co/daily-js';

const CALL_OPTIONS = {
  showLeaveButton: true,
  iframeStyle: {
    height: '100%',
    width: '100%',
    aspectRatio: 16 / 9,
    border: '0',
    borderRadius: '12px',
  },
};

const CallRoom = ({ room, setRoom, callFrame, setCallFrame }: any) => {
  const callRef = useRef(null);
  const createAndJoinCall = useCallback(() => {
    const newCallFrame = DailyIframe.createFrame(
      callRef?.current as unknown as HTMLElement,
      CALL_OPTIONS as unknown as DailyCallOptions
    );

    setCallFrame(newCallFrame);

    newCallFrame.join({ url: room });

    const leaveCall = () => {
      setRoom(null);
      setCallFrame(null);
      callFrame.destroy();
    };

    newCallFrame.on('left-meeting', leaveCall);
  }, [room, setCallFrame]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    if (callFrame) return;

    createAndJoinCall();
  }, [callFrame, createAndJoinCall]);

  return (
    <div id="callRoom" ref={callRef} />
  );
}

export default CallRoom;
