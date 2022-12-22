import { useTranslation } from 'react-i18next'
import { Button, CircleButton } from 'Components/Atoms'
import clsx from 'clsx'

type TActionIntroduction = {
  header: string
  actionLabel: string
  description?: string
  skipLabel?: string
  onActionSelected: () => void
  onBackSelected?: () => void
  onSkipSelected?: () => void
  sizeClassName?: string
}

export const ActionIntroduction = ({
  header,
  actionLabel,
  description,
  skipLabel,
  onActionSelected,
  onBackSelected,
  onSkipSelected,
  sizeClassName
}: TActionIntroduction) => {
  const { t } = useTranslation()

  return (
    <div className="relative text-center">
      <div className="grid gap-6">
        <p className="text-2xl font-semibold text-white">{header}</p>
        {description && <p className="text-lg text-white">{description}</p>}
      </div>
      <div className="h-16"></div>
      <div className="mb-8 grid grid-cols-1 justify-items-center">
        <Button
          text={actionLabel}
          mode="dark"
          extraClassName={clsx('mb-5', sizeClassName)}
          onClick={onActionSelected}
        />
        {!onBackSelected && onSkipSelected && (
          <span
            className="cursor-pointer text-sm text-white underline"
            onClick={onSkipSelected}
          >
            {skipLabel || t('general.skip')}
          </span>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full lg:w-content-container">
        <div className="flex items-center justify-between p-6">
          {onBackSelected && (
            <CircleButton
              iconType="back"
              variant="secondary"
              onClick={onBackSelected}
            />
          )}
          {onBackSelected && onSkipSelected && (
            <span
              className="cursor-pointer text-sm text-white underline"
              onClick={onSkipSelected}
            >
              {t('general.skip')}
            </span>
          )}
        </div>
        <div className="h-settings-only-menu"></div>
      </div>
    </div>
  )
}
