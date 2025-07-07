import { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import TourModal from './TourModal';

const steps = [
  {
    target: '[data-tour="talking-avatar"]',
    content: 'Click the avatar to hear a short intro!',
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="music-player"]',
    content: 'Control the background music here.',
  },
  {
    target: '[data-tour="hero-canvas"]',
    content: 'Browse the menu & interactive 3‑D area.',
  },
  {
    target: 'body',
    content: 'You can always chat with the assistant in the bottom‑right corner!',
    placement: 'center',
    spotlightClicks: false,
  },
];

export default function TourProvider() {
  const [showModal, setShowModal] = useState(
    !sessionStorage.getItem('tourDone')
  );
  const [run, setRun] = useState(false);

  const startTour = () => {
    setShowModal(false);
    setTimeout(() => setRun(true), 1000);
  };

  const skipTour = () => {
    setShowModal(false);
    sessionStorage.setItem('tourDone', 'true');
  };

  const handle = data => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      sessionStorage.setItem('tourDone', 'true');
      setRun(false);
    }
  };

  return (
    <>
      {showModal && <TourModal onStart={startTour} onSkip={skipTour} />}

      <Joyride
        run={run}
        steps={steps}
        continuous
        showSkipButton
        showProgress
        disableOverlayClose
        scrollToFirstStep
        spotlightClicks
        callback={handle}
        styles={{
          options: {
            zIndex: 10000,
            backgroundColor: '#101010',
            textColor: '#fff',
            arrowColor: '#00ffe0',
            primaryColor: '#00bcd4',
          },
        }}
      />
    </>
  );
}
