import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import axiosInstance from "../../lib/utils/Axios";
import { useDispatch } from 'react-redux';
import { getPurities } from "../../lib/strore/Slices/puritySlice";


function EditPurityModal({ open, onClose, initialValues, metals }) {    
    const [formData, setFormData] = useState(initialValues);
    console.log();
    const dispatch=useDispatch()

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

   

    const handleSubmit = async() => {
        try {
            const res = await axiosInstance.put(`/purity/updateby/${initialValues?._id}`,formData)
            console.log(res);
            dispatch(getPurities())
            onClose()
        } catch (error) {
            console.log(error); 
        }

    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Purity</DialogTitle>
            <DialogContent dividers sx={{ display: "grid", gap: 2 }}>
                <TextField
                    select
                    label="Metal"
                    name="metal"
                    value={formData?.metal}
                    onChange={handleChange}
                    
                >
                    {metals?.map((metal) => (
                        <MenuItem key={metal} value={metal}>
                            {metal}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Purity Name"
                    name="purityName"
                    value={formData?.purityName}
                    onChange={handleChange}    
                />

                <TextField
                    label="Description"
                    name="description"
                    value={formData?.description}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditPurityModal;
