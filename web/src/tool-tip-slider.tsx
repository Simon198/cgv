import * as React from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import Range from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const HandleTooltip = (props: {
  value: number;
  children: React.ReactElement;
  visible: boolean;
}) => {
  const { value, children, visible, ...restProps } = props;

  const tooltipRef = React.useRef<any>();
  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={value}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender: SliderProps['handleRender'] = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};

const TooltipSlider = ({
  tipProps,
  ...props
}: SliderProps & { tipProps: any }) => {
  const tipHandleRender: SliderProps['handleRender'] = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        {...tipProps}
      >
        {node}
      </HandleTooltip>
    );
  };

  return <Slider range {...props} handleRender={tipHandleRender} />;
};

export default TooltipSlider;