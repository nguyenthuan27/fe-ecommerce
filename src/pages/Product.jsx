import React from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import API from "../connect-api/products";
import productData from '../assets/fake-data/products'
import { useState } from 'react'

const Product = props => {

    const [product, setProduct] = useState("");
    const getProducts = async () => {
        let res = await API.getListProductAll();
        const data = res.result.listproductall.find(
          (item) => (item.productid = props.match.params.slug)
        );
        setProduct(data);
    };


    const relatedProducts = productData.getProducts(8)

    React.useEffect(() => {
        getProducts()
        window.scrollTo(0,0)
    }, [])

    return (
      <Helmet title={product.title}>
        <Section>
          <SectionBody>
            <ProductView product={product} />
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Khám phá thêm</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {relatedProducts.map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
            </Grid>
          </SectionBody>
        </Section>
      </Helmet>
    );
}

export default Product
