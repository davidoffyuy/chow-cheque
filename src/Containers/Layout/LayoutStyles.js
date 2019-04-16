export default theme => ({
    main_content: {
        height: "calc(100vh - 128px)",
        paddingTop: "10vh"
    },
    tip_calc__container: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },
    main_fab: {
        display: "inline-block",
        position: "fixed",
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 3
    }
});
