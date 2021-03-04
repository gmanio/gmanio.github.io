import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';

export const HeaderWrapper = styled(AppBar)`
  display: flex;
  position: relative;
  padding: 0px 16px !important;
  width: 100%;
  height: 64px;
  background-color: #fff !important;
  box-shadow: 0px 1px 7px 0px rgb(0 0 0 / 10%) !important;
  color: #3a3a3a !important;
  justify-content: center;
`;

export const HeaderToolbar = styled(Toolbar)({
  padding: '0px !important',
  margin: '0 auto',
  width: '100%',
  minHeight: '64px !important',
  maxWidth: 1080
});

export const HeaderIconButton = IconButton;

export const HeaderAvatar = styled(Avatar)`
  position: absolute !important;
  right: 0;
`;

export const HeaderTitle = styled(Typography)({
  textAlign: 'center',
  padding: '0 8px'
});

export { MenuIcon };