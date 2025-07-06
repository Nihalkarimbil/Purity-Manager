import { TrendingUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurities } from '../lib/strore/Slices/puritySlice';
import { getlatestMetalRates } from '../lib/strore/Slices/RateSlice';
import { useFormik } from 'formik';
import { MetalValidation } from '../lib/validation/validation';
import axiosInstance from '../lib/utils/Axios';
import toast from 'react-hot-toast';


function Ratemanagement() {
    const dispatch = useDispatch();
    const { purities } = useSelector((state) => state.Purity);
    const { rates, loading } = useSelector((state) => state.Rate);

    const METALS = ['Gold', 'Silver', 'Platinum'];

    useEffect(() => {
        dispatch(getPurities());
    }, [dispatch]);

    const initialValues = {
        metal: '',
        purity: '',
        rate: '',
    }

    const { values, handleSubmit, handleChange, handleBlur, touched, errors, resetForm } = useFormik({
        initialValues,
        validationSchema: MetalValidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axiosInstance.post("/metalRate/add", values);
                console.log(response);

                toast.success("New rate added");
                resetForm();
            } catch (error) {
                toast.error("Failed to add purity");
                console.log(error);
            }
        }
    });
    useEffect(() => {
        const selectedPurity = purities.find(
            (p) => p._id === values.purity && p.metal === values.metal
        );

        if (values.metal && values.purity && selectedPurity?._id) {
            dispatch(getlatestMetalRates({ metal: values.metal, purityId: selectedPurity._id }));
        }
    }, [values.metal, values.purity, purities, dispatch]);


    const getAvailablePurities = (metal) => purities.filter((p) => p.metal === metal);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-lg p-6 space-y-6"
            >
                <div className="flex items-center mb-6">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Add New Rate</h2>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Metal
                    </label>
                    <select
                        name="metal"
                        value={values.metal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2"
                    >
                        <option value="">Choose Metal...</option>
                        {METALS.map((metal) => (
                            <option key={metal} value={metal}>
                                {metal}
                            </option>
                        ))}
                    </select>
                    {touched.metal && errors.metal && (
                        <div className="text-red-600 text-sm mt-1">{errors.metal}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Purity
                    </label>
                    <select
                        name="purity"
                        value={values.purity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2"
                        disabled={!values.metal}
                    >
                        <option value="">Choose Purity...</option>
                        {getAvailablePurities(values.metal).map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.purityName}
                            </option>
                        ))}
                    </select>
                    {touched.purity && errors.purity && (
                        <div className="text-red-600 text-sm mt-1">{errors.purity}</div>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Rate (₹ per gram)
                    </label>
                    <input
                        name="rate"
                        type="number"
                        step="0.01"
                        value={values.rate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2"
                        placeholder="Enter new rate"
                    />
                    {touched.rate && errors.rate && (
                        <div className="text-red-600 text-sm mt-1">{errors.rate}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate Date</label>
                    <input
                        name="date"
                        type="date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2"
                    />
                    {touched.date && errors.date && (
                        <div className="text-red-600 text-sm mt-1">{errors.date}</div>
                    )}
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors hover:cursor-pointer"
                    >
                        Save Rate
                    </button>
                    <button
                        type="button"
                        onClick={() => resetForm()}
                        className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors hover:cursor-pointer"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Rate History</h3>

                {values.metal && values.purity ? (
                    loading ? (
                        <div className="text-blue-700 text-center">Loading rate...</div>
                    ) : rates ? (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-gray-800">
                                        ₹{rates.rate} per gram
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {new Date(rates.rateDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">
                            No rate found for the selected metal and purity.
                        </div>
                    )
                ) : (
                    <div className="text-gray-500 text-center">
                        Please select metal and purity to view latest rate.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ratemanagement;
