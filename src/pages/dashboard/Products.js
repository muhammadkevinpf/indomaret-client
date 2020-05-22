import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Cards from "../../components/Cards";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getProducts,
  nextProduct,
  prevProduct,
} from "../../redux/actions/productActions";
const styles = (theme) => ({
  ...theme.fileTheme,
  paper: {
    width: "100%",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  pagination: {
    marginTop: 20,
    marginBottom: 10,
  },
  cards: {
    height: 250,
  },
});

function Products({
  classes,
  product: { products, loading },
  getProducts,
  prevProduct,
  nextProduct,
}) {
  let skeleton = [];
  const [paginateNext, setPaginateNext] = useState(false);
  const [paginatePrev, setPaginatePrev] = useState(true);
  useEffect(() => {
    async function fetchProduct() {
      getProducts();
    }
    fetchProduct();
  }, [getProducts]);

  for (let i = 0; i < 12; i++) {
    skeleton.push(
      <Grid item xs={6} sm={6} md={3} lg={2} style={{ lineHeight: 4 }}>
        <Skeleton height={150} />
        <Skeleton />
      </Grid>
    );
  }

  const handleChangeNext = () => {
    setPaginatePrev(false);
    setPaginateNext(true);
    nextProduct();
  };

  const handleChangePrev = () => {
    setPaginatePrev(true);
    setPaginateNext(false);
    prevProduct();
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        {!loading
          ? products.map((product) => {
              return (
                <Grid item xs={6} sm={6} md={3} lg={2} key={product.productId}>
                  <Link
                    to={`/products/${product.productId}`}
                    className={classes.componentLink}
                  >
                    <Cards classCard={classes.cards}>
                      <img
                        src={product.imageUrl}
                        className={classes.image}
                        alt="gambar"
                      />
                      <Typography variant="body2" className={classes.linkText}>
                        {product.name}
                      </Typography>
                    </Cards>
                  </Link>
                </Grid>
              );
            })
          : skeleton.map((skeletong) => {
              return skeletong;
            })}
      </Grid>
      <div className={`${classes.displayFlex} ${classes.justifyCenter}`}>
        <PaginationItem
          type="previous"
          color="primary"
          className={classes.pagination}
          onClick={handleChangePrev}
          disabled={paginatePrev}
        />
        <PaginationItem
          type="next"
          color="primary"
          className={classes.pagination}
          onClick={handleChangeNext}
          disabled={paginateNext}
        />
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  product: state.product,
});

const mapActionsToProps = {
  getProducts,
  nextProduct,
  prevProduct,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Products));
