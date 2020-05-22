import React from "react";
import { Card, CardContent } from "@material-ui/core";

function Cards({ children, classCard, classContent }) {
  return (
    <Card className={classCard}>
      <CardContent className={classContent}>{children}</CardContent>
    </Card>
  );
}

export default Cards;
