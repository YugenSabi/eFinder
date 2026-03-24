import {cssVarColor} from '@ui/theme';

export function SparkIcon() {
  return (
    <span aria-hidden="true" style={{color: cssVarColor('primary')}}>
      *
    </span>
  );
}
