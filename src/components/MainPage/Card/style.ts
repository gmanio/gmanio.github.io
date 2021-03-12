import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled, { css } from 'styled-components';

export const ExpandedIconButton = styled(IconButton)`
  transition: all .3s ease-in-out !important;
  transform: rotate(0deg);

  ${(props: { isOpen: boolean }) => props.isOpen && css`
    transform: rotate(180deg);
    transition: all .3s ease-in-out !important;
  `}
`;

export { FavoriteIcon, ShareIcon, ExpandMoreIcon, Card, CardHeader, Avatar, IconButton, MoreVertIcon, CardMedia, CardContent, Typography, CardActions };