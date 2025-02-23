'use client'

import { useTranslation } from '@/lib/contexts/TranslationContext'
import { t } from '@/lib/i18n/translations'

export default function BillingPage() {
    const { currentLanguage } = useTranslation()

    return (
        <div>
            <div className="flex flex-col space-y-1 mb-6">
                <h1 className="text-xl font-semibold text-foreground">
                    {t(currentLanguage, 'ui.settings.billing.title')}
                </h1>
                <p className="text-xs text-muted-foreground">
                    {t(currentLanguage, 'ui.settings.billing.description')}
                </p>
            </div>
        </div >
    )
} 