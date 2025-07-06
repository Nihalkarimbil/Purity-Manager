import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/utils/Axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { Purityvalidation } from '../lib/validation/validation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPurities } from '../lib/strore/Slices/puritySlice';
import EditPurityModal from './ui/PurityEditModal';

function PurityManagement() {
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(getPurities())
    },[dispatch])

    const [editOpen, setEditOpen] = useState(false);
    const [selectedPurity, setSelectedPurity] = useState(null);
    
    const { purities } = useSelector((state) => state.Purity)

    const METALS = ['Gold', 'Silver', 'Platinum'];
    const initialValues = {
        metal: '',
        purity: '',
        description: '',
    }

    const handleEditClick = (purity) => {
        setSelectedPurity(purity);
        setEditOpen(true);
    };
    const { handleBlur, handleSubmit, handleChange, values, touched, errors,handleReset } = useFormik({
        initialValues,
        validationSchema: Purityvalidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                const datatosent = {
                    metal: values.metal,
                    purityName: values.purity,
                    description:values.description
                };
                await axiosInstance.post("/purity/add", datatosent);
                toast.success("New purity added");
                dispatch(getPurities())
                resetForm();
            } catch (error) {
                toast.error("Failed to add purity");
                console.log(error);
            }
        }
    });

    const deletePurity = async(id) => {
        try {
            await axiosInstance.delete(`/purity/delete/${id}`)
            dispatch(getPurities())
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <PlusCircle className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Add New Purity
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Metal</label>
                        <select
                            name="metal"
                            value={values.metal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${touched.metal && errors.metal ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Choose Metal...</option>
                            {METALS.map(metal => (
                                <option key={metal} value={metal}>{metal}</option>
                            ))}
                        </select>
                        {touched.metal && errors.metal && (
                            <p className="text-red-500 text-sm mt-1">{errors.metal}</p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Purity Name</label>
                        <input
                            type="text"
                            name="purity"
                            value={values.purity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g., 24K, 22K, 999"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${touched.purity && errors.purity ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {touched.purity && errors.purity && (
                            <p className="text-red-500 text-sm mt-1">{errors.purity}</p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Optional description"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {touched.description && errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer"
                        >
                            Add Purity
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors hover:cursor-pointer"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Current Purities</h3>
                <div className="space-y-3">
                    {purities.map(purity => (
                        <div key={purity._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-semibold text-gray-800">
                                    {purity.metal} - {purity.purityName}
                                </div>
                                <div className="text-sm text-gray-600">{purity.description}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Active
                                </span>
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg hover:cursor-pointer" onClick={()=>handleEditClick(purity)}>
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => deletePurity(purity._id)}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg hover:cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div><EditPurityModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                initialValues={selectedPurity}
                metals={METALS}
            />
        </div>
    );
}

export default PurityManagement;
