import React, { Component } from 'react';
import data from '../../data-layer/data';
import './App.css';

const { promoCodes, images } = data;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			promoCode: '',
			showPromoCodeDialog: false,
		};
	}

	onNavLinkClick = ({ linkId }) => (e) => {
		e.preventDefault();

		const elem = document.getElementById(linkId);
		const rect = elem.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		window.scrollTo({
			top: rect.top + scrollTop,
			behavior: "smooth"
		});
	};

	onInputChange = (e) => {
		const value = e.target.value;

		this.setState({
			promoCode: value,
		});
	};

	onInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.setState({
				showPromoCodeDialog: true,
			});
		}
	};

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

	renderNavigationSection() {
		const navigationLinks = [
			{
				id: 'home',
				name: 'Day4You',
			},
			{
				id: 'promo',
				name: 'Promo',
			},
			{
				id: 'description',
				name: 'Description',
			},
			{
				id: 'contacts',
				name: 'Contacts',
			}
		];

		return (
			<nav className="navigation-panel">
				<div className="app-container">
					<ul className="navigation-links">
						{navigationLinks.map((link, index) => {
							const { id, name } = link;

							return (
								<li
									onClick={this.onNavLinkClick({ linkId: id })}
									className="navigation-item"
									key={index}>
									<a className="navigation-item__link" target="_self" href={`#${id}`}>
										{name}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		)
	}

	renderPromoCodeDialog() {
		const {
			promoCode,
			showPromoCodeDialog,
		} = this.state;

		if (!showPromoCodeDialog) {
			return null;
		}

		return (
			<div className="">

			</div>
		);
	}

	render() {
		const {
			promoCode,
		} = this.state;

		return (
			<div className="app">
				<header className="app__header">
					{this.renderNavigationSection()}
				</header>
				<main className="app__main">
					<div className="title-section" id="home">
						<div className="app-container">
							<h2 className="title-section__header">Day For You</h2>
						</div>
					</div>
					<div className="promo-section" id="promo">
						<div className="app-container">
							<div className="promo-section__form">
								<label className="promo-label" htmlFor="promo-code-input">
									Enter promo code here:
								</label>
								<input
									value={promoCode}
									id="promo-code-input"
									className="promo-section__input"
									type="text"
									onChange={this.onInputChange}
									onKeyPress={this.onInputKeyPress}
									maxLength={8}
								/>
							</div>
						</div>
					</div>
					<div className="project-description-section" id="description">
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
				<footer className="app__footer" id="contacts">
					<div className="app-container">
						footer
					</div>
				</footer>
				{this.renderPromoCodeDialog()}
			</div>
		);
	}
}

export default App;
