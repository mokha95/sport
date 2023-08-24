import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditArticle } from 'components/articles';
import { Spinner } from 'components';
import { articleService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [article, setArticle] = useState(null);

    // recupere l id dans le query du chemin
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch article and set default form values if in edit mode
        articleService.getById(id)
            .then(x => setArticle(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Modifier Article</h1>
            {article ? <AddEditArticle article={article} /> : <Spinner />}
        </Layout>
    );
}