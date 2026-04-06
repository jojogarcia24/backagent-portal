-- Add fields required for CDA auto-generation workflow.
-- This migration is additive and safe to re-run.

alter table public.transactions
  add column if not exists cda_status text default 'not_started',
  add column if not exists cda_generated_by uuid,
  add column if not exists cda_error text,
  add column if not exists cda_sent_to_title_at timestamptz,
  add column if not exists funding_confirmation_url text,
  add column if not exists disbursement_authorization_url text,
  add column if not exists buyer_contribution_letter_url text,
  add column if not exists seller_contribution_letter_url text,
  add column if not exists w9_url text;

alter table public.funding_requests
  add column if not exists include_w9 boolean default false,
  add column if not exists include_buyer_contribution_letter boolean default false,
  add column if not exists include_seller_contribution_letter boolean default false,
  add column if not exists cda_generated_at timestamptz,
  add column if not exists cda_id uuid,
  add column if not exists funding_confirmation_internal_url text,
  add column if not exists disbursement_authorization_url text,
  add column if not exists buyer_contribution_letter_url text,
  add column if not exists seller_contribution_letter_url text,
  add column if not exists w9_url text,
  add column if not exists cda_error text;

alter table public.cdas
  add column if not exists cda_url text,
  add column if not exists funding_confirmation_internal_url text,
  add column if not exists disbursement_authorization_url text,
  add column if not exists buyer_contribution_letter_url text,
  add column if not exists seller_contribution_letter_url text,
  add column if not exists w9_url text,
  add column if not exists source_funding_request_id uuid,
  add column if not exists status text default 'generated',
  add column if not exists generated_by uuid,
  add column if not exists metadata jsonb default '{}'::jsonb,
  add column if not exists error_message text;

update public.cdas
set cda_url = coalesce(cda_url, file_url)
where file_url is not null;

create index if not exists idx_cdas_transaction_id on public.cdas(transaction_id);
create index if not exists idx_cdas_source_funding_request_id on public.cdas(source_funding_request_id);

alter table public.funding_requests
  drop constraint if exists funding_requests_cda_id_fkey;

alter table public.funding_requests
  add constraint funding_requests_cda_id_fkey
  foreign key (cda_id) references public.cdas(id)
  on delete set null;

alter table public.cdas
  drop constraint if exists cdas_source_funding_request_id_fkey;

alter table public.cdas
  add constraint cdas_source_funding_request_id_fkey
  foreign key (source_funding_request_id) references public.funding_requests(id)
  on delete set null;
