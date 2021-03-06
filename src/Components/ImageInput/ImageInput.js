import React from 'react';
import './ImageInput.css'

const ImageInput = ({ onInputChange, onButtonSubmit, onKeyPress }) => {
	return (
		<div>
			<p className='f3'>
				{"This Magic Brain will detect faces in Your pictures"}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input
						className='h2 f4 pa2 w-70 center'
						type='text'
						placeholder='Enter the image URL here'
						onChange={onInputChange}
						onKeyPress={onKeyPress}
					/>
					<button 
						className='h2 w-30 grow f4 link ph3 dib white bg-light-purple'
						onClick={onButtonSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageInput;