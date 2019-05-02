export default theme => ({
    filler: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "auto",
        flexGrow: 1
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexGrow: 0,
        marginLeft: ".5rem"
    },
    saved_bill_list_item: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});
