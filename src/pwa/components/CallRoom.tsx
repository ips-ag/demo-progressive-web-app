import { useCallback, useEffect, useRef } from 'react';
import DailyIframe, { DailyCallOptions } from '@daily-co/daily-js';

const CALL_OPTIONS = {
  showLeaveButton: true,
  iframeStyle: {
    width: '100%',
    height: '100%',
    borderRadius: '12px'
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

  useEffect(() => {
    if (callFrame) return;

    createAndJoinCall();
  }, [callFrame, createAndJoinCall]);

  return (
    <div className='callRoom' ref={callRef} >
      <style jsx>{`
          .callRoom {
            height: 90vh
          }
        `}</style>
    </div>
  );
}

export default CallRoom;
