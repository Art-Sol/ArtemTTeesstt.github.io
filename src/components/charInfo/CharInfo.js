import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);
	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
			updateChar();
	}, [props.charId])

	const updateChar = () => {
		const {charId} = props;
		if (!charId) {
			return;
		}

		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const skeleton = char || loading || error ? null : <Skeleton/>
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;

	const comicsList = comics.map((item, i) => {
		return (
			<li key={i} className="char__comics-item">
				<Link to={`comics/${item.resourceURI.slice(43)}`}>{item.name}</Link>
			</li>
		)
	}).filter((item, i) => i < 10);

	const comicsErrorMessage = comicsList.length > 0 ? null : 'This hero has no comics';
	
	let imgStyle = {objectFit: 'cover'};
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = {objectFit: 'unset'};
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsErrorMessage}
				{comicsList}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;