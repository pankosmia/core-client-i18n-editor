import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function AlertDialog(
    {
        buttonVariant = 'outlined',
        buttonSize = "large",
        buttonColor = "primary",
        buttonPrompt,
        dialogTitle,
        dialogContent,
        yesLabel,
        noLabel
    }
) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button variant={buttonVariant} size={buttonSize} color={buttonColor} onClick={handleClickOpen}>
                {buttonPrompt}
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>{noLabel}</Button>
                    <Button onClick={handleCloseDialog} autoFocus>{yesLabel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}