export const ServiceDetails = theme => ({
    root: {
        marginTop: "5vh",
        width: "20%",
        display: "flex",
        height: "60vh",
        justifyContent: "right",
        flexDirection: "column",
        paddingTop: "1vh"
    },
    textField: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    nameField: {
        width: "70%"
    },
    title: {
        margin: theme.spacing.unit * 3,
        marginBottom: "0px"
    },
    requestType: {
        width: "40%"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
    }
});
