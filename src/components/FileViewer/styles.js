export const VersionViewer = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    viewer: {
        margin: '2vh 1vw',
        maxHeight: '67vh',
        overflowY: "auto"
    },
    paperRoot: {
        position: 'relative',
        paddingBottom: "5px"
    },
    saveChanges: {
        position: "absolute",
        zIndex: 10000,
        bottom: "10px",
        right: "125px"
    },
    cancel:{
        position: "absolute",
        zIndex: 10000,
        bottom: "10px",
        right: "15px"
    }

});
export const JsonViewer = theme => ({
    editButton: {
        position: "absolute",
        zIndex: 10000,
        top: "52px",
        right: "5px"
    },
})