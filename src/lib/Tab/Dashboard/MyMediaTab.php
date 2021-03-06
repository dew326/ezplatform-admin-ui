<?php
declare(strict_types=1);

namespace EzSystems\EzPlatformAdminUi\Tab\Dashboard;


use eZ\Publish\API\Repository\PermissionResolver;
use eZ\Publish\API\Repository\SearchService;
use eZ\Publish\Core\Pagination\Pagerfanta\ContentSearchAdapter;
use EzSystems\EzPlatformAdminUi\Tab\AbstractTab;
use EzSystems\EzPlatformAdminUi\Tab\OrderedTabInterface;
use Pagerfanta\Pagerfanta;
use Symfony\Component\Translation\TranslatorInterface;
use Twig\Environment;

class MyMediaTab extends AbstractTab implements OrderedTabInterface
{
    /** @var PagerContentToDataMapper */
    protected $pagerContentToDataMapper;

    /** @var SearchService */
    protected $searchService;

    /** @var PermissionResolver */
    protected $permissionResolver;

    /**
     * @param Environment $twig
     * @param TranslatorInterface $translator
     * @param PagerContentToDataMapper $pagerContentToDataMapper
     * @param SearchService $searchService
     * @param PermissionResolver $permissionResolver
     */
    public function __construct(
        Environment $twig,
        TranslatorInterface $translator,
        PagerContentToDataMapper $pagerContentToDataMapper,
        SearchService $searchService,
        PermissionResolver $permissionResolver
    )
    {
        parent::__construct($twig, $translator);

        $this->pagerContentToDataMapper = $pagerContentToDataMapper;
        $this->searchService = $searchService;
        $this->permissionResolver = $permissionResolver;
    }

    public function getIdentifier(): string
    {
        return 'my-media';
    }

    public function getName(): string
    {
        return /** @Desc("Media") */
            $this->translator->trans('tab.name.my_media', [], 'dashboard');
    }

    public function getOrder(): int
    {
        return 300;
    }

    public function renderView(array $parameters): string
    {
        /** @todo Handle pagination */
        $page = 1;
        $limit = 10;

        /** @todo subtree shouldn't be hardcoded! */
        $query = new SubtreeQuery(
            '/1/43/',
            $this->permissionResolver->getCurrentUserReference()->getUserId()
        );

        $pager = new Pagerfanta(
            new ContentSearchAdapter($query, $this->searchService)
        );
        $pager->setMaxPerPage($limit);
        $pager->setCurrentPage($page);

        return $this->twig->render('EzPlatformAdminUiBundle:dashboard/tab:my_media.html.twig', [
            'data' => $this->pagerContentToDataMapper->map($pager),
        ]);
    }
}
