<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\UI\Config\Provider\FieldType\RichText;

use eZ\Publish\Core\MVC\ConfigResolverInterface;
use EzSystems\EzPlatformAdminUi\UI\Config\ProviderInterface;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Provides information about RichText Custom Tags.
 */
class CustomTag implements ProviderInterface
{
    /** @var ConfigResolverInterface */
    private $configResolver;

    /** @var array */
    private $customTagsConfiguration;

    /** @var \Symfony\Component\Translation\TranslatorInterface */
    private $translator;

    /**
     * @param ConfigResolverInterface $configResolver
     * @param \Symfony\Component\Translation\TranslatorInterface $translator
     * @param array $customTagsConfiguration
     */
    public function __construct(
        ConfigResolverInterface $configResolver,
        TranslatorInterface $translator,
        array $customTagsConfiguration
    ) {
        $this->configResolver = $configResolver;
        $this->translator = $translator;
        $this->customTagsConfiguration = $customTagsConfiguration;
    }

    /**
     * @return array RichText Custom Tags config
     */
    public function getConfig(): array
    {
        if ($this->configResolver->hasParameter('fieldtypes.ezrichtext.custom_tags')) {
            return $this->mapConfig(
                $this->configResolver->getParameter('fieldtypes.ezrichtext.custom_tags')
            );
        }

        return [];
    }

    /**
     * Map system settings to UI configuration.
     *
     * @param array $enabledCustomTags List of Custom Tags enabled in the current scope
     *
     * @return array Mapped configuration
     */
    private function mapConfig(array $enabledCustomTags): array
    {
        $config = [];
        foreach ($enabledCustomTags as $tagName) {
            if (!isset($this->customTagsConfiguration[$tagName])) {
                throw new \RuntimeException("RichText Custom Tag configuration for {$tagName} not found.");
            }

            $customTagConfiguration = $this->customTagsConfiguration[$tagName];

            $config[$tagName]['icon'] = $customTagConfiguration['icon'];
            $config[$tagName]['label'] = $this->translator->trans("ezrichtext.custom_tags.{$tagName}.label", [], 'custom_tags');
            $config[$tagName]['description'] = $this->translator->trans("ezrichtext.custom_tags.{$tagName}.description", [], 'custom_tags');
            foreach ($customTagConfiguration['attributes'] as $attributeName => $properties) {
                $config[$tagName]['attributes'][$attributeName] = [
                    'label' => $this->translator->trans("ezrichtext.custom_tags.{$tagName}.attributes.{$attributeName}.label", [], 'custom_tags'),
                    'type' => $properties['type'],
                    'required' => $properties['required'],
                    'defaultValue' => $properties['default_value'],
                ];

                if ('choice' === $properties['type'] && isset($properties['choices'])) {
                    $config[$tagName]['attributes'][$attributeName]['choices'] = $properties['choices'];
                }
            }
        }

        return $config;
    }
}
