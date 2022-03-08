import { FunctionComponent, ReactElement } from 'react';
import TooltipComponent from '@mui/material/Tooltip';

interface TooltipProps {
  title: string;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ title, children }) => {
  return (
    <TooltipComponent
      title={title}
      componentsProps={{
        tooltip: {
          sx: {
            fontFamily: `'Abel', sans-serif`,
            fontSize: '1.6rem',
            backgroundColor: '#24cca7',
          },
        },
      }}
    >
      {children as ReactElement}
    </TooltipComponent>
  );
};

export default Tooltip;
