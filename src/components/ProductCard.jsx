import classnames from 'classnames'
import styles from './ProductCard.module.css'
import Icon from './Icon'

export const ProductCard = ({
    title,
    imageUrl,
    isHit,
    isSale,
    isFavorite,
    currentPrice,
    oldPrice,
    flowersCount,
    bouquetHeight,
    bouquetWidth,
}) => {

    const card_title = title

    const defImageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png'
    const card_imageUrl = (imageUrl !== undefined && imageUrl !== '') ? imageUrl : defImageUrl

    const card_isHit = isHit
    const card_isSale = isSale
    const card_isFavorite = isFavorite
    const card_currentPrice = currentPrice
    const card_oldPrice = oldPrice
    const card_flowersCount = flowersCount
    const card_bouquetHeight = bouquetHeight
    const card_bouquetWidth = bouquetWidth

    const showOldPrice = (card_oldPrice !== undefined && card_oldPrice !== 0 && card_oldPrice !== '' && card_oldPrice !== '0')

    return <div data-testid="product-card" className={classnames(styles.card)} >
        <div data-testid="product-image" className={classnames(styles.image)} style={{ backgroundImage: `url(${card_imageUrl})` }}>

            {card_isHit && <div className={classnames(styles.hit)}>Хит</div>}

            {card_isSale && <div className={classnames(styles.sale)}>Скидка</div>}

            <div className={classnames(styles.fav)}>
                {
                    card_isFavorite ?
                        <Icon iconType={'infav'} />
                        :
                        <Icon iconType={'outfav'} />
                }
            </div>
        </div>
        <div className={classnames(styles.info)}>
            <div className={classnames(styles.title)}>{card_title}</div>
            <div className={classnames(styles.price)}>
                <div className={classnames(card_isSale ? styles.currentPriceRed : styles.currentPrice)}>{card_currentPrice} ₽</div>
                {
                    showOldPrice && <div data-testid="product-old-price" className={classnames(styles.oldPrice)}>{card_oldPrice} ₽</div>
                }
            </div>
            <div className={classnames(styles.params)}>
                {
                    (card_flowersCount !== 0 && card_flowersCount !== undefined) && <div data-testid="product-count" className={classnames(styles.number)}>
                        <Icon iconType={'number'} />
                        {card_flowersCount} шт.
                    </div>
                }
                {
                    (card_bouquetWidth !== 0 && card_bouquetWidth !== undefined) && <div data-testid="product-width" className={classnames(styles.width)}>
                        <Icon iconType={'width'} />
                        {card_bouquetWidth} см
                    </div>
                }
                {
                    (card_bouquetHeight !== 0 && card_bouquetHeight !== undefined) && <div data-testid="product-height" className={classnames(styles.height)}>
                        <Icon iconType={'height'} />
                        {card_bouquetHeight} см
                    </div>
                }
            </div>
        </div>
        <div className={classnames(styles.actions)}>
            <button data-testid="product-cart" disabled={(card_flowersCount === 0)} onClick={() => alert('cart')} className={classnames(styles.cartBtn)}>В корзину</button>
            <button data-testid="product-buy" disabled={(card_flowersCount === 0)} onClick={() => alert('buy')} className={classnames(styles.buyBtn)}>Купить сразу</button>
        </div>
    </div>
}