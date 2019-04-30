export default theme => ({
    filler: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    saved_bill_list_item: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});
