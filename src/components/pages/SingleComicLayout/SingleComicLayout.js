import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import './singleComicLayout.scss'

const SingleComicLayout = ({data}) => {
	const { name, title, description, thumbnail, pageCount, language, price } = data;
	
		return (
			<div className="single-comic">
				<Helmet>
					<meta
						name="description"
						content={`${name} comics book`}
					/>
					<title>{name}</title>
				</Helmet>
				<img src={thumbnail} alt="name" className="single-comic__img"/>
				<div className="single-comic__info">
						<h2 className="single-comic__name">{name}</h2>
						<p className="single-comic__descr">{description}</p>
						<p className="single-comic__descr">{pageCount}</p>
						<p className="single-comic__descr">{language}</p>
						<div className="single-comic__price">{price}</div>
				</div>
				<Link to='/comics' className="single-comic__back">Back to all</Link>
			</div>
		)
}

export default SingleComicLayout;