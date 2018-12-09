export const ServiceDetails = theme => ({
    root: {
        marginTop: "5vh",
        width: "20%",
        display: "flex",
        height: "70vh",
        justifyContent: "right",
        flexDirection: "column",
        paddingTop: "1vh"
    },
    textField: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    nameField: {
        width: "70%"
    },
    title: {
        margin: theme.spacing.unit * 2,
        marginBottom: "0px"
    },
    requestType: {
        width: "50%"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
    }
});


export const ServiceDetailsComplete = theme => ({
    root: {
        marginTop: "5vh",
        width: "20%",
        display: "flex",
        height: "fit-content",
        paddingBottom: "20px",
        justifyContent: "right",
        flexDirection: "column",
        paddingTop: "0.5vh",
        position: "relative"
    },
    title: {
        margin: theme.spacing.unit * 3,
        marginBottom: "0px"
    },
    noWebHookTitle: {
        margin: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit
    },
    webHookContainer: {
        overflowX: "auto",
        display: "flex",
        margin: theme.spacing.unit * 2
    },
    description: {
        wordBreak: "break-word",
        maxHeight: "30vh",
        overflowY: "auto"
    },
    webHookText: {
        marginTop: "13px"
    },
    chip: {
        margin: theme.spacing.unit,
    },
    editButton: {
        width: "45px",
        position: "absolute",
        right: "0",
    }
});
