import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Skeleton from "react-loading-skeleton";
//Materia UI
import {
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import withStyle from "@material-ui/core/styles/withStyles";
import {
  CreateOutlined,
  DoneOutline,
  CancelOutlined,
} from "@material-ui/icons";

import { connect } from "react-redux";
import { getProduct, updateProduct } from "../../redux/actions/productActions";

const styles = (theme) => ({
  ...theme.fileTheme,
  image: {
    height: 350,
  },
  paper: {
    height: 400,
    margin: theme.spacing(1),
    overflow: "auto",
  },
  center: {
    textAlign: "center",
  },
  divDetail: {
    padding: theme.spacing(3),
  },
  divPrice: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  divForm: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  button: {
    marginRight: theme.spacing(2),
  },
  IconButton: {
    marginRight: 5,
  },
});

const ProductDetails = (props) => {
  const {
    product: { product, loading },
    credentials: { role },
    getProduct,
    updateProduct,
    classes,
  } = props;

  const [show, setShow] = useState(false);
  const [priceValue, setPriceValue] = useState({ price: "", reason: "" });
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorReason, setErrorReason] = useState(false);

  let { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      await getProduct(productId);
    }
    fetchProduct();
  }, [getProduct, productId]);

  const handleClick = () => {
    setShow(!show);
    // setError({ price: false, reason: false });
  };

  const changeType = () => {
    if (priceValue.price.length === 0) {
      setErrorPrice(true);
    } else {
      setErrorPrice(false);
    }

    if (priceValue.reason.length === 0) {
      setErrorReason(true);
    } else {
      setErrorReason(false);
    }

    if (priceValue.price.length > 0 && priceValue.reason.length > 0) {
      updateProduct(productId, {
        price: parseInt(priceValue.price),
        reason: priceValue.reason,
      });
      setShow(false);
      setErrorPrice(false);
      setErrorReason(false);
    }
  };

  const handleChange = (event) => {
    setPriceValue({ ...priceValue, [event.target.name]: event.target.value });
  };

  return (
    <Grid container>
      {!loading ? (
        <Fragment>
          <Grid item xs={12} md={6} lg={5} className={classes.center}>
            <Paper className={classes.paper}>
              <Zoom>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={classes.image}
                />
              </Zoom>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Paper className={classes.paper}>
              <div className={classes.divDetail}>
                <Typography variant="h5">{product.name}</Typography>
              </div>
              <Divider />
              {role === "manager" ? (
                <div className={classes.divDetail}>
                  <div className={!show ? classes.divPrice : classes.divForm}>
                    {!show && (
                      <Tooltip title="Ubah Harga" placement="top">
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={handleClick}
                        >
                          <CreateOutlined />
                        </IconButton>
                      </Tooltip>
                    )}

                    {show ? (
                      <Fragment>
                        <TextField
                          type="number"
                          name="price"
                          label="Harga"
                          onChange={handleChange}
                          autoComplete="off"
                          error={errorPrice}
                          helperText={errorPrice && "Tidak boleh kosong"}
                          style={{ marginBottom: 5 }}
                        />
                        <TextField
                          multiline
                          name="reason"
                          label="Alasan"
                          onChange={handleChange}
                          error={errorReason}
                          helperText={errorReason && "Tidak boleh kosong"}
                          autoComplete="off"
                        />
                        <div className="text-center">
                          <IconButton
                            variant="outlined"
                            color="secondary"
                            onClick={handleClick}
                          >
                            <CancelOutlined className={classes.IconButton} />{" "}
                            <Typography variant="h6">Batal</Typography>
                          </IconButton>
                          <IconButton
                            variant="outlined"
                            onClick={changeType}
                            style={{ color: "#32a852", fill: "#32a852" }}
                          >
                            <DoneOutline className={classes.IconButton} />
                            <Typography variant="h6">Ubah</Typography>
                          </IconButton>
                        </div>
                      </Fragment>
                    ) : (
                      <Typography variant="h5" className="text-blue">
                        Rp. {product.price}
                      </Typography>
                    )}
                  </div>
                </div>
              ) : (
                <div className={classes.divDetail}>
                  <Typography variant="h5" className="text-blue">
                    Rp. {product.price}
                  </Typography>
                </div>
              )}

              <Divider />
              <div className={classes.divDetail}>
                <Typography variant="h6">Detail</Typography>
                <Typography variant="body1">{product.description}</Typography>
              </div>
            </Paper>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Grid item xs={12} md={6} lg={5}>
            <Paper className={classes.paper}>
              <Skeleton height={350} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Paper className={classes.paper}>
              <div className={classes.divDetail}>
                <Skeleton height={30} />
              </div>
              <div className={classes.divDetail}>
                <Skeleton height={30} />
              </div>
              <div className={classes.divDetail}>
                <Skeleton height={100} />
              </div>
            </Paper>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  product: state.product,
});

const mapActionsToProps = {
  getProduct,
  updateProduct,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(ProductDetails));
