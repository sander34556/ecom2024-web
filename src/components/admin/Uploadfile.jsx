import React, { useState } from 'react'
import Resize from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import { removeFiles, uploadFiles } from '../../api/product';
import useEcomStore from '../../store/ecom-store';
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
    const token = useEcomStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            let allFiles = form.images // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);
                // validate
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not image`)
                    continue
                }
                //Image resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint back-end
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)

                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image success!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    console.log(item);
                    return item.public_id !== public_id
                })

                console.log(res)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    console.log(form);
    return (
        <div className='my-4'>

            <div className='flex gap-4 mx-4 my-4'>
                {
                    isLoading && <Loader className='w-16 h-16 animate-spin' />
                }
                
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-105'
                                src={item.url}
                            />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute top-1 right-1 bg-red-500 p-1 rounded hover:cursor-pointer'>
                                X
                            </span>
                        </div>
                    )
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>

        </div>
    )
}

export default Uploadfile