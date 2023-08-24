import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { articleService } from 'services';

export default Index;

function Index() {
    const [articles, setArticles] = useState(null);
// recupere tout les utilisateurs
    useEffect(() => {
        articleService.getAll().then(x => setArticles(x));
    }, []);

    function deleteArticle(id) {
        setArticles(articles.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
       articleService.delete(id).then(() => {
            setArticles(articles => articles.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Articles</h1>
            <Link href="/articles/add" className="btn btn-sm btn-success mb-2">Ajouter un article</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Titre</th>
                        <th style={{ width: '30%' }}>Contenu</th>
                        <th style={{ width: '30%' }}>Image</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {articles && articles.map(article =>
                        <tr key={article.id}>
                            <td>{article.title}</td>
                          

                            <td > <p> {article.content}</p></td>
                           
                            <td>{article.img}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/articles/edit/${article.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteArticle(article.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={article.isDeleting}>
                                    {article.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!articles &&
                       ( <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }
                    {articles && !articles.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;articles à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}
