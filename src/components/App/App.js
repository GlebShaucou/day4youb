import React, { Component } from 'react';
import data from '../../data-layer/data';
import './App.css';

const { promoCodes, images } = data;

class App extends Component {
	renderArticles() {
		const imagesForRender = Object.keys(images);

		return imagesForRender.map((imageName, index) => {
			const image = images[imageName];
			const {
				title,
				description,
				src,
				alt,
			} = image;

			return (
				<div key={index} className="article">
					<img src={src} alt={alt} className="article__image" />
					<h4 className="article__title">
						{title}
					</h4>
					<div className="article__description">
						{description}
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="app">
				<header className="app__header">
					<div className="app-container">
						<h1 className="header__title">Day 4 You</h1>
					</div>
				</header>
				<main className="app__main">
					<div className="title-section">
						<div className="app-container">
							<h2 className="title-section__header">Day For You</h2>
						</div>
					</div>
					<div className="promo-section">
						<div className="app-container">
							<div className="promo-section__form">
								<label className="promo-label" htmlFor="promo">
									Enter promo code here:
								</label>
								<input
									id="promo"
									className="promo-section__input"
									type="text"
								/>
							</div>
						</div>
					</div>
					<div className="project-description-section">
						<div className="app-container">
							<div className="description-section">
								<h3 className="description__title">
									Day For You application description
								</h3>
								<div className="description__body">
									{this.renderArticles()}
								</div>
							</div>
						</div>
					</div>
				</main>
				<footer className="app__footer">
					footer
				</footer>
			</div>
		);
	}
}

export default App;
