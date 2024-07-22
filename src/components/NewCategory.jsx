import uuid from "react-uuid";
import {useState} from "react";

function NewCategory({entry, categoriesList, setCategoriesList, onDataChange}) {

    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({});

    // Category Items
    function addCategoryItem(e) {
        // Create default category item with attributes based on selected category's configuration 
        let defaultCategoryItem = {
            uuid: uuid(),
        };
        Object.keys(entry.categoryInputTypes).forEach((type) => {
            if (entry.categoryInputTypes[type]) {
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

        setEditId(defaultCategoryItem.uuid);
        setFormData(defaultCategoryItem);
    }

    function handleEditCategoryItem()

    function handleDeleteCategoryItem(uuidItemToDelete) {

    }


    // function handleCategoryItemChange(e, uuidItemToChange) {
    //     const {name, value} = e.target;
    //     const updatedCategoryItems = [...formData.categoryItems].map((item) => {
    //         if (item.uuid === uuidItemToChange) {
    //             item = {
    //                 ...item, 
    //                 [name]: value
    //             };
    //         }
    //         return item;
    //     })

    //     setFormData({
    //         ...formData,
    //         categoryItems: updatedCategoryItems,
    //     }) 
    // }

    // function handleCancel() {
    //     setEditId(null);
    //     setFormData({});
    // }

    // function handleSave() {
    //     const updatedCategoriesList = [...categoriesList].map((cat) => {
    //             return cat.uuid === editId ? formData : cat
    //         })

    //     setCategoriesList(updatedCategoriesList);
    //     onDataChange("categories", updatedCategoriesList);
        
    //     setEditId(null);
    //     setFormData({});
    // }


    return (<>
                <h2 className="loader-title">
                {entry.categoryTitle != "" ? entry.categoryTitle : "Unnamed Category"}
                </h2>

                {entry.categoryItems.map((item) => {
                return (
                        <div className="entry category-item" key={item.uuid}>
                            <div className="entry-summary category-item">
                                {item.value}
                            </div>
                            <div className="entry-controls category-item">
                                <button id="item-edit" onClick={(e) => handleEditCategoryItem(e, item.uuid)}>Edit</button>
                                <button id="item-delete" onClick={(e) => handleDeleteCategoryItem(e, item.uuid)}>Delete</button>
                            </div>
                        </div>
                )
                })}
                <button id="add-category-item" onClick={addCategoryItem}>
                    Add Item
                </button>
            </>
        )
}

export default NewCategory;