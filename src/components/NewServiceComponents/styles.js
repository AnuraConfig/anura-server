const root = {
    marginTop: "5vh",
    display: "flex",
    height: "fit-content",
    paddingBottom: "20px",
    justifyContent: "right",
    flexDirection: "column",
    paddingTop: "0.5vh",
    position: "relative"
}

export const DetailsWindow = theme => ({
    root,
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


export const DetailsWindowComplete = theme => ({
    root,
    title: {
        margin: theme.spacing.unit * 2,
        marginBottom: "0px"
    },
    noWebHookTitle: {
        margin: theme.spacing.unit * 2,
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

