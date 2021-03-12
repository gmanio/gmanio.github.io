import React from 'react';
import * as Styled from './style';

const Card: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log(expanded);
  };

  return (
    <Styled.Card>
      <Styled.CardHeader
        avatar={<Styled.Avatar aria-label="recipe">R</Styled.Avatar>}
        action={
          <Styled.IconButton aria-label="settings">
            <Styled.MoreVertIcon />
          </Styled.IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
     <Styled.CardMedia
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <Styled.CardContent>
        <Styled.Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Styled.Typography>
      </Styled.CardContent>

      <Styled.CardActions disableSpacing>
        <Styled.IconButton aria-label="add to favorites">
          <Styled.FavoriteIcon />
        </Styled.IconButton>
        <Styled.IconButton aria-label="share">
          <Styled.ShareIcon />
        </Styled.IconButton>
        <Styled.ExpandedIconButton
          isOpen={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Styled.ExpandMoreIcon />
        </Styled.ExpandedIconButton>
      </Styled.CardActions>

    </Styled.Card>
  );
};

export default Card;
