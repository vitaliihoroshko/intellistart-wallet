import { string, node } from 'prop-types';
import TooltipComponent from '@mui/material/Tooltip';

const Tooltip = ({ title, children }) => {
  return (
    <TooltipComponent
      title={title}
      followCursor={true}
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
      {children}
    </TooltipComponent>
  );
};

Tooltip.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
};

export default Tooltip;
