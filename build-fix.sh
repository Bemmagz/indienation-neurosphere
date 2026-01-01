#!/bin/bash
# Bypass deteksi arsitektur android-arm64
export NEXT_PRIVATE_SKIP_SWC_CHECK=1
npm run build
