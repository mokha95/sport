
import Main from 'components/Main';
import Section from 'components/Section';
import Section2 from 'components/Section2';
import Article from 'components/Article';
import Footer from 'components/Footer';
import { SectionArticle } from 'components/articles/SectionArticle';
// 

export default Home;

function Home() {
    return (
        <div >
            <Main />
            <Section />
            <SectionArticle/>
            <Section2 />
            
        </div>
    );
}
