import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";

export default theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: orange[500]
    },
    icon: {
        fontSize: 20,
        opacity: 0.9
    },
    iconVariant: {
        marginRight: theme.spacing.unit
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    margin: {
        margin: theme.spacing.unit
    }
});
