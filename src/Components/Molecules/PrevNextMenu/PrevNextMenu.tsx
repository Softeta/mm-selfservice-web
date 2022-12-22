import clsx from 'clsx'
import { CircleButton } from 'Components/Atoms'
import { Button } from 'Components/Atoms'
import { useTranslation } from 'react-i18next'

type TPrevNextMenu = {
  onBackBtnClick?: () => void
  onSubmitBtnClick?: (...rest: any[]) => void
  onSkipBtnClick?: (...rest: any[]) => void
  isBackBtnDisabled?: boolean
  isSubmitBtnDisabled?: boolean
  className?: string
  isLoading?: boolean
  fullWidth?: boolean
  bottomPositionClassName?: string
  continueButtonLabel?: string
}

export const PrevNextMenu = ({
  onBackBtnClick,
  onSubmitBtnClick,
  onSkipBtnClick,
  isBackBtnDisabled = false,
  isSubmitBtnDisabled = false,
  className,
  isLoading,
  fullWidth,
  bottomPositionClassName = 'bottom-settings-only-menu sm:bottom-0',
  continueButtonLabel
}: TPrevNextMenu) => {
  const { t } = useTranslation()

  /*
  Adding 5rem gap and making sure menu controls would have fixed same height ensures that
  content in the forms where this control is being used would not overlap the last fields,
  so they would become unfillable by the user.
  */
  return (
    <>
      <div className="h-prev-next-menu"></div>
      <div
        className={clsx(
          'fixed inset-x-0 grid h-prev-next-menu w-full place-items-center rounded-t-3xl border-t bg-white px-6',
          className,
          bottomPositionClassName
        )}
      >
        <div
          className={clsx(
            'mx-auto flex',
            onBackBtnClick && 'justify-between',
            !onBackBtnClick && 'justify-end',
            fullWidth ? 'w-full' : 'w-full lg:w-content-container'
          )}
        >
          {onBackBtnClick && (
            <CircleButton
              tabIndex={-1}
              iconType="back"
              variant="secondary"
              disabled={isBackBtnDisabled || isLoading}
              onClick={(event) => {
                event.preventDefault()
                onBackBtnClick()
              }}
            />
          )}
          {onSubmitBtnClick && (
            <Button
              isLoading={isLoading}
              type="button"
              text={continueButtonLabel || t('button.next')}
              disabled={isSubmitBtnDisabled || isLoading}
              onClick={(event) => {
                event.preventDefault()
                onSubmitBtnClick!()
              }}
            />
          )}
          {onSkipBtnClick && (
            <span
              className="cursor-pointer text-sm text-spanish-gray underline"
              onClick={onSkipBtnClick}
            >
              {t('general.skip')}
            </span>
          )}
        </div>
      </div>
      <div className="h-settings-only-menu"></div>
    </>
  )
}
