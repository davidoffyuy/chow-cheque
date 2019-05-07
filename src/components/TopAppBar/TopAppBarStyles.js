export default theme => ({
    myContent: {
        marginTop: "100px",
        fontSize: "50px"
      },
    myIcon:{
        fontSize: theme.spacing.unit
    },
    [theme.breakpoints.down("xs")]: {
        myContent: {
          color: theme.palette.secondary.main
        }
    },
    grow: {flexGrow: 1},
    app_bar_icon_container: {
      width: "36px",
      height: "36px",
      border: "0px solid black",
      borderRadius: "50% 50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      cursor: "pointer"
    }
});
