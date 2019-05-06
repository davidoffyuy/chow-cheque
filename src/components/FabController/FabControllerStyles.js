import { Hidden } from "@material-ui/core";

export default theme => ({
    fab_icon: {
        fontSize: "28px"
    },
    fab_up: {
        transform: 'translate3d(0, -46px, 0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.enteringScreen,
          easing: theme.transitions.easing.easeOut,
        }),
      },
    fab_down: {
        transform: 'translate3d(0, 0, 0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.leavingScreen,
          easing: theme.transitions.easing.sharp,
        }),
    }
});