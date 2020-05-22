import React from "react";
import { Grid, Typography } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import DollarIcon from "@material-ui/icons/Money";
import TransactionIcon from "@material-ui/icons/ShoppingBasket";
import Cards from "../../components/Cards";
import withStyles from "@material-ui/core/styles/withStyles";
import Chart from "../../components/Chart";
import TableProducts from "../../components/TableProducts";
const styles = (theme) => ({
  ...theme.fileTheme,
  content: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  typo: {
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: "center",
  },
});

const cardTop = [
  {
    logo: <StoreIcon />,
    text: "160",
    smallText: "toko",
    bg: "bg-red",
  },
  {
    logo: <TransactionIcon />,
    text: "5000",
    smallText: "produk",
    bg: "bg-blue",
  },
  {
    logo: <DollarIcon />,
    text: "5000",
    smallText: "Transaksi",
    bg: "bg-yellow",
  },
];

function Dashboard({ classes }) {
  return (
    <Grid container spacing={6}>
      {cardTop.map((card, index) => {
        return (
          <Grid item xs={12} md={4} xl={4} key={index}>
            <Cards
              classCard={classes.displayFlex}
              classContent={classes.content}
            >
              <div className={`circle-border ${card.bg}`}>{card.logo}</div>
              <div>
                <Typography variant="h6" className={classes.typography}>
                  {card.text} <small>{card.smallText}</small>
                </Typography>
              </div>
            </Cards>
          </Grid>
        );
      })}
      <Grid item xs={12} lg={6}>
        <TableProducts />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Cards>
          <Typography variant="h5" className={classes.typo}>
            Grafik Penjualan Tahun 2020
          </Typography>
          <Chart />
        </Cards>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Dashboard);
