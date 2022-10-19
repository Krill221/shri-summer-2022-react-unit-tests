
import { render, screen } from "@testing-library/react";
import { ProductCard } from './ProductCard'
import { getBouquetItem } from '../__mocks__/bouquetItem'

//const {container, getByTestId} =  render(application)
//const hit = getByTestId('product-hit')
//screen.logTestingPlaygroundURL()

describe('Компонент «Карточка товара»', () => {


    // hit and sale
    it('Отображает "Хит" элемент, если он есть', () => {
        const bouquet = getBouquetItem()
        bouquet.isHit = true

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Хит')).toBeInTheDocument()
    })

    it('Не отображает "Хит" элемент, если его нет', () => {
        const bouquet = getBouquetItem()
        bouquet.isHit = false

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Хит')).not.toBeInTheDocument()
    })

    it('Отображает "Скидка" элемент, если он есть', () => {
        const bouquet = getBouquetItem()
        bouquet.isSale = true

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Скидка')).toBeInTheDocument()
    })

    it('Не отображает "Скидка" элемент, если его нет', () => {
        const bouquet = getBouquetItem()
        bouquet.isSale = false

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Скидка')).not.toBeInTheDocument()
    })

    it('Отображает "Хит" и "Скидка" элемент, если они есть', () => {
        const bouquet = getBouquetItem()
        bouquet.isSale = true
        bouquet.isHit = true

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Хит')).toBeInTheDocument()
        expect(screen.queryByText('Скидка')).toBeInTheDocument()
    })

    it('Не отображает "Хит" и "Скидка" элемент, если их нет', () => {
        const bouquet = getBouquetItem()
        bouquet.isSale = false
        bouquet.isHit = false

        const application = <ProductCard {...bouquet} />
        render(application)

        expect(screen.queryByText('Хит')).not.toBeInTheDocument()
        expect(screen.queryByText('Скидка')).not.toBeInTheDocument()
    })



    // price
    it('Отображает "Старую сцену" элемент, если старая цена есть', () => {
        const bouquet = getBouquetItem()
        bouquet.oldPrice = 1000

        const application = <ProductCard {...bouquet} />
        const { getByTestId } = render(application)

        const oldPrice = getByTestId('product-old-price')

        expect(oldPrice).toBeInTheDocument()
    })

    it('Не отображает "Старую сцену" элемент, если старая цена undefined', () => {
        const bouquet = getBouquetItem()
        bouquet.oldPrice = undefined

        const application = <ProductCard {...bouquet} />
        render(application)

        const oldPrice = screen.queryByTestId('product-old-price')

        expect(oldPrice).not.toBeInTheDocument()
    })

    it('Не отображает "Старую сцену" элемент, если старая цена 0', () => {
        const bouquet = getBouquetItem()
        bouquet.oldPrice = 0

        const application = <ProductCard {...bouquet} />
        render(application)

        const oldPrice = screen.queryByTestId('product-old-price')

        expect(oldPrice).not.toBeInTheDocument()
    })

    it('Не отображает "Старую сцену" элемент, если старая цена ""', () => {
        const bouquet = getBouquetItem()
        bouquet.oldPrice = ''

        const application = <ProductCard {...bouquet} />
        render(application)

        const oldPrice = screen.queryByTestId('product-old-price')

        expect(oldPrice).not.toBeInTheDocument()
    })

    it('Не отображает "Старую сцену" элемент, если старая цена "0"', () => {
        const bouquet = getBouquetItem()
        bouquet.oldPrice = '0'

        const application = <ProductCard {...bouquet} />
        render(application)

        const oldPrice = screen.queryByTestId('product-old-price')

        expect(oldPrice).not.toBeInTheDocument()
    })


    // fav
    // price
    it('Активный компонент "избранное", если выбран', () => {
        const bouquet = getBouquetItem()
        bouquet.isFavorite = true

        const application = <ProductCard {...bouquet} />
        render(application)

        const infav = screen.queryByTestId('product-icon-infav')
        const outfav = screen.queryByTestId('product-icon-outfav')

        //screen.logTestingPlaygroundURL()

        expect(infav).toBeInTheDocument()
        expect(outfav).not.toBeInTheDocument()
    })

    it('Не активный компонент "избранное", если не выбран', () => {
        const bouquet = getBouquetItem()
        bouquet.isFavorite = false

        const application = <ProductCard {...bouquet} />
        render(application)

        const infav = screen.queryByTestId('product-icon-infav')
        const outfav = screen.queryByTestId('product-icon-outfav')

        expect(infav).not.toBeInTheDocument()
        expect(outfav).toBeInTheDocument()
    })

    /// image
    it('Show default pic, pic url is undefined', () => {
        const bouquet = getBouquetItem()
        bouquet.imageUrl = undefined

        const application = <ProductCard {...bouquet} />
        render(application)

        const image = screen.queryByTestId('product-image')
        const defImageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png'

        expect(image).toHaveStyle(`background-image: url(${defImageUrl})`)
    })
    it('Show default pic, pic url is ""', () => {
        const bouquet = getBouquetItem()
        bouquet.imageUrl = ''

        const application = <ProductCard {...bouquet} />
        render(application)

        const image = screen.queryByTestId('product-image')
        const defImageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png'

        expect(image).toHaveStyle(`background-image: url(${defImageUrl})`)
    })


    // buttons
    it('Disabled buy and cart buttons if flowers count is 0', () => {
        const bouquet = getBouquetItem()
        bouquet.flowersCount = 0

        const application = <ProductCard {...bouquet} />
        render(application)

        const buy = screen.queryByTestId('product-buy')
        const cart = screen.queryByTestId('product-cart')

        expect(buy).toBeDisabled()
        expect(cart).toBeDisabled()
    })

    // count
    it('Not show count element if flowers count is 0', () => {
        const bouquet = getBouquetItem()
        bouquet.flowersCount = 0

        const application = <ProductCard {...bouquet} />
        render(application)

        const count = screen.queryByTestId('product-count')

        expect(count).not.toBeInTheDocument()
    })
    it('Not show count element if flowers count is undefined', () => {
        const bouquet = getBouquetItem()
        bouquet.flowersCount = undefined

        const application = <ProductCard {...bouquet} />
        render(application)

        const count = screen.queryByTestId('product-count')

        expect(count).not.toBeInTheDocument()
    })

    // width
    it('Not show width element if flowers width is 0', () => {
        const bouquet = getBouquetItem()
        bouquet.bouquetWidth = 0

        const application = <ProductCard {...bouquet} />
        render(application)

        const width = screen.queryByTestId('product-width')

        expect(width).not.toBeInTheDocument()
    })
    it('Not show width element if flowers width is undefined', () => {
        const bouquet = getBouquetItem()
        bouquet.bouquetWidth = undefined

        const application = <ProductCard {...bouquet} />
        render(application)

        const width = screen.queryByTestId('product-width')

        expect(width).not.toBeInTheDocument()
    })

    // height
    it('Not show height element if flowers height is 0', () => {
        const bouquet = getBouquetItem()
        bouquet.bouquetHeight = 0

        const application = <ProductCard {...bouquet} />
        render(application)

        const height = screen.queryByTestId('product-height')

        expect(height).not.toBeInTheDocument()
    })
    it('Not show height element if flowers height is undefined', () => {
        const bouquet = getBouquetItem()
        bouquet.bouquetHeight = undefined

        const application = <ProductCard {...bouquet} />
        render(application)

        const height = screen.queryByTestId('product-height')

        expect(height).not.toBeInTheDocument()
    })
});