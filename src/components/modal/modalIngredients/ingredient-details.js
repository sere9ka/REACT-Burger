import React from 'react';
import style from '../modal.module.css'
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
    const ingredient = props.ingredientModal
    if (typeof ingredient['name'] !== 'undefined') {
        return (
            <div className={`${style.modalIngredient} ${style.modal} pl-10 pr-10 pt-10 pb-15`}>
                <div className={`${style.headerModal}`}>
                    <h2 className={`${style.modalIngredientTitle} text text_type_main-large`}>Детали ингредиента</h2>
                </div>
                <div className={`${style.modalIngredientImg}`}>
                    <img src={ingredient.image_large} alt="" />
                </div>
                <h3 className={`${style.ingredientName} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h3>
                <div className={`${style.nutritionValues} text text_type_main-default text_color_inactive`}>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Каллории,ккал</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.calories}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Белки,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.proteins}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Жиры,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.fat}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Углеводы,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.carbohydrates}</span>
                    </div>
                </div>
            </div>
        )
    } else return ('')
}
IngredientDetails.propTypes = {
    ingredientModal: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default IngredientDetails