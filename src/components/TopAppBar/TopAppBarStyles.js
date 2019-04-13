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
    grow: {flexGrow: 1}
});
