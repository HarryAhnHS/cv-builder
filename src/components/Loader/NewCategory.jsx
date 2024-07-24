import uuid from "react-uuid";
import {useState} from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewCategory({entry, categoriesList, setCategoriesList, onDataChange, handleEditCategory, handleDeleteCategory}) {

    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({});

    // Category Items
    function addCategoryItem() {
        // Create default category item with attributes based on selected category's configuration 
        let defaultCategoryItem = {
            uuid: uuid(),
        };
        Object.keys(entry.categoryInputTypes).forEach((type) => {
            if (entry.categoryInputTypes[type].exists) {
                defaultCategoryItem[type] =  "";
            }
        })

        // Update state of category list with new default categoryitem
        const updatedCategoriesList = [...categoriesList].map((category) => {
            return category.uuid === entry.uuid 
            ? {
                ...category, 
                categoryItems: [...category.categoryItems, defaultCategoryItem]
            }
            : category
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);

        setFormData(defaultCategoryItem);
        setEditId(defaultCategoryItem.uuid);
    }

    function handleEditCategoryItem(e,uuidItemToEdit) {
        const itemToEdit = entry.categoryItems.find((item) => item.uuid === uuidItemToEdit);

        console.log(itemToEdit);
        console.log(uuidItemToEdit);
        setFormData(itemToEdit);
        setEditId(uuidItemToEdit);
    }

    function handleDeleteCategoryItem(e, uuidItemToDelete) {
        const updatedCategory = {
            ...entry,
            categoryItems: [...entry.categoryItems].filter((item) => item.uuid !== uuidItemToDelete)
        }

        const updatedCategoriesList = [...categoriesList].map((category) => {
            return category.uuid === entry.uuid ? updatedCategory : category;
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
    }


    // Form Stuff
    function handleCategoryItemChange(e) {
        const {name, value} = e.target;
        const updatedCategoryItem = {
            ...formData,
            [name]: value

        }

        setFormData(updatedCategoryItem) 
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        const updatedCategoryItems = 
            [...categoriesList.find((category) => category.uuid === entry.uuid).categoryItems].map((item) => {
                return (item.uuid === editId)
                ? {
                    ...formData,
                    EndDate: formData.EndDate === "" ? "Present" : formData.EndDate
                }
                : item;
        })

        

        const updatedCategoriesList = categoriesList.map((category) => {
            return category.uuid === entry.uuid 
            ? {
                ...category,
                categoryItems: updatedCategoryItems,
            }
            : category;
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
        
        setEditId(null);
        setFormData({});
    }

    console.log("NewCategory formData", formData);


    return(
            <>
                {editId 
                ?
                    // Edit Mode
                    <Form>
                        {Object.keys(entry.categoryInputTypes).map((key) => {
                            return entry.categoryInputTypes[key].exists 
                            ?
                                (entry.categoryInputTypes[key] == 'Description')
                                ?
                                    <Form.Group className="mb-3" controlId="categoryItemDescription">
                                        <Form.Label>Add a description</Form.Label>
                                        <Form.Control as="textarea" rows={3} 
                                            type="textarea" 
                                            name={key}
                                            value={formData[key]}
                                            onChange = {(e) => handleCategoryItemChange(e)}
                                        />
                                    </Form.Group>
                                :
                                    <Form.Group className='mb-3' controlId={key}>
                                        {(key == 'EndDate'
                                        ?
                                        <Form.Label>End Date<span className="text-muted fw-light justify-self-end mx-1" style={{fontSize:'0.8rem'}}>Leave empty if still present</span></Form.Label>
                                        :
                                        <Form.Label>{key == 'StartDate' ? 'Start Date' : key}</Form.Label>
                                        )}
                                        
                                        <Form.Control 
                                            type= {entry.categoryInputTypes[key].inputType}
                                            name=   {key}
                                            value={formData[key]}
                                            onChange = {(e) => handleCategoryItemChange(e)}
                                        />
                                    </Form.Group>
                            :
                                null
                        })}
                        <div className="form-controls category w-100 d-flex justify-content-end">
                            <Button className="mx-1" variant="primary" onClick={handleSave} active>
                                Save
                            </Button>{' '}
                            <Button className="mx-1"variant="secondary" onClick={handleCancel} active>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                :
                    // Display Mode
                    <div className="list new-category">
                        <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-sm btn-primary fs-6 mx-1 fw-lighter" onClick={() => handleEditCategory(entry.uuid)}>
                                Edit Category
                            </button>
                            <button className="btn btn-sm btn-danger fs-6 mx-1 fw-lighter" onClick={() => handleDeleteCategory(entry.uuid)}>
                                Delete Category
                            </button>
                        </div>

                        <div className="rounded border px-2" style={{borderColor: 'lightgray'}}>
                        {entry.categoryItems.map((item) => {
                        return (
                                <div className="d-flex py-2 px-1" key={item.uuid}>
                                    <div className="flex-fill d-flex align-items-center">
                                        {item.Title}
                                    </div>
                                    <button className="btn btn-sm btn-outline-danger fs-6 m-1" id="edit-entry" onClick={(e) => handleEditCategoryItem(e, item.uuid)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger fs-6 m-1" id="delete-entry" onClick={(e) => handleDeleteCategoryItem(e, item.uuid)}>
                                        Delete
                                    </button>
                                </div>
                        )
                        })}
                        </div>
                        <div className="d-grid mt-3">
                            <Button variant="outline-primary" onClick={addCategoryItem}>
                                Add new item to {entry.categoryTitle}
                            </Button>
                        </div>
                    </div>
                }
            </>
        )
}

export default NewCategory;